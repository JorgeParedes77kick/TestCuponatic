<?php

namespace App\Command;

use App\Entity\Discount;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class CSVimportCommand extends Command
{
    protected static $defaultName = 'csv:import';
    protected static $defaultDescription = 'import CSV discount data to DB';
    private $em;
    private $projectDir;

    public function __construct($projectDir, EntityManagerInterface $em)
    {
        $this->projectDir = $projectDir;
        $this->em = $em;
        parent::__construct();
    }
    protected function configure(): void
    {
        // $this
        //     ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
        //     ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $inputFile = $this->projectDir . '/public/csv/datos_descuentos_buscador_prueba.2.0.csv';
        $encoders = [new XmlEncoder(), new CsvEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        $discountRows = $serializer->decode(file_get_contents($inputFile), 'csv');
        foreach ($discountRows as $key => $discountRow) {
            # code...
            $discount = new Discount($discountRow);
            $this->em->persist($discount);
        }
        $this->em->flush();
        $io = new SymfonyStyle($input, $output);
        $io->success('It is worked!');

        return Command::SUCCESS;
    }
}
