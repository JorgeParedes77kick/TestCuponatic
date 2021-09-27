<?php

namespace App\Entity;

use App\Repository\DiscountRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DiscountRepository::class)
 */
class Discount
{
    public function __construct(array $data = null)
    {
        if (!is_null($data)) {
            $this->titulo = $data['titulo'];
            $this->descripcion = $data['descripcion'];
            $this->fecha_inicio = new DateTime($data['fecha_inicio']);
            $this->fecha_termino =  new DateTime($data['fecha_termino']);
            $this->precio = $data['precio'];
            $this->imagen = $data['imagen'];
            $this->vendidos = $data['vendidos'];
            $this->tags = $data['tags'];
        }
    }
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titulo;

    /**
     * @ORM\Column(type="text", options={"default": ""})
     */
    private $descripcion;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fecha_inicio;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fecha_termino;

    /**
     * @ORM\Column(type="integer")
     */
    private $precio;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imagen;

    /**
     * @ORM\Column(type="integer", options={"default": 0})
     */
    private $vendidos;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $tags;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): self
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getFechaInicio(): ?\DateTimeInterface
    {
        return $this->fecha_inicio;
    }

    public function setFechaInicio(\DateTimeInterface $fecha_inicio): self
    {
        $this->fecha_inicio = $fecha_inicio;

        return $this;
    }

    public function getFechaTermino(): ?\DateTimeInterface
    {
        return $this->fecha_termino;
    }

    public function setFechaTermino(\DateTimeInterface $fecha_termino): self
    {
        $this->fecha_termino = $fecha_termino;

        return $this;
    }

    public function getPrecio(): ?int
    {
        return $this->precio;
    }

    public function setPrecio(int $precio): self
    {
        $this->precio = $precio;

        return $this;
    }

    public function getImagen(): ?string
    {
        return $this->imagen;
    }

    public function setImagen(?string $imagen): self
    {
        $this->imagen = $imagen;

        return $this;
    }

    public function getVendidos(): ?int
    {
        return $this->vendidos;
    }

    public function setVendidos(?int $vendidos): self
    {
        $this->vendidos = $vendidos;

        return $this;
    }

    public function getTags(): ?string
    {
        return $this->tags;
    }

    public function setTags(?string $tags): self
    {
        $this->tags = $tags;

        return $this;
    }
}
