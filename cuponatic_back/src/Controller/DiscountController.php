<?php

namespace App\Controller;

use App\Entity\Discount;
use App\Repository\DiscountRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DiscountController extends AbstractController
{
    /**
     * @Route("/discount/list/{order}", name="discount_list")
     */
    public function index(PaginatorInterface $paginator, Request $request, string $order = "titulo asc"): Response
    {
        $vars = explode(' ',$order );
        $name = "titulo";
        $ord = "asc";
        if (count($vars) == 2) {
            $name = $vars[0];
            $ord = $vars[1];
        }
        $em = $this->getDoctrine()->getManager();
        $query = $em->getRepository(Discount::class)->getAllByOrder($name, $ord == 'asc');
        $pagination = $paginator->paginate(
            $query,
            $request->query->getInt('page', 1),
            15
        );
        $maxPage=ceil($pagination->getTotalItemCount()/15); 
        // $discount = $em->getRepository(Discount::class)->findBy(array(), array('titulo' => 'asc'));
        return $this->json([
            'pagination' => $pagination,
            'maxPage'=>$maxPage,
        ]);
    }
}
