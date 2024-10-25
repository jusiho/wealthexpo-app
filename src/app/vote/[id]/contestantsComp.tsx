"use client";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export default function ContestantsComp({ contestantsArray, categoryId }: any) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [selectedContestant, setSelectedContestant] = useState<{
    id: String;
    nombre: String;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleVoteClick = (
    contestant: {
      id: String;
      nombre: String;
    } | null
  ) => {
    setSelectedContestant(contestant);
    onOpen(); // Abre el modal
  };

  const handleVoteSubmit = async () => {
    console.log("Votando por", selectedContestant, "con el correo", email);

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch("/api/createVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: Number(categoryId),
          name: selectedContestant?.nombre,
          email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.error || "Hubo un problema al registrar tu voto.");
      }

      // Cerrar el modal y resetear el formulario
      setEmail("");
      setError("");
      alert("¡Voto registrado con éxito!");
      onClose;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contestantsArray.map((contestant: any) => (
        <div onClick={() => handleVoteClick(contestant)}>
          <Card
            key={contestant.id}
            className="cursor-pointer hover:border-primary"
          >
            <CardBody>
              <h3 className="font-semibold">{contestant.nombre}</h3>
              <p>{contestant.descripcion}</p>
            </CardBody>
          </Card>
        </div>
      ))}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Votación
              </ModalHeader>
              <ModalBody>
                <p>
                  Ingresa tu correo para votar por tu favorito, una vez votado
                  en esta categoría no podras volver a votar
                </p>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Ingresa tu correo electrónico"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleVoteSubmit}>
                  Confirmar voto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
