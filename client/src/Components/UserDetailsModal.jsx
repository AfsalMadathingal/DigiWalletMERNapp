import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const UserDetailsModal = ({ user, setViewing, setEditing }) => {
  if (!user) return null;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="success" onPress={onOpen} variant="ghost">
        View
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/150"
                    alt={user.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-gray-600">{user.role}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Information</h3>
                  <ul className="mb-4">
                    <li>Email: {user.email}</li>
                    <li>Phone: {user.phone}</li>
                  </ul>
                  <h3 className="font-semibold mb-2">Files</h3>
                  <ul>
                    <li>Annual Report.pdf</li>
                    <li>Logistics Report.xls</li>
                    <li>User Registration.pdf</li>
                    <li>Inventory Management.pdf</li>
                    <li>Listing.xls</li>
                  </ul>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    setEditing(true);
                    setViewing(false);
                  }}
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default UserDetailsModal;
