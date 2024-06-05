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

const UserDetailsModal = ({ setSelectedUser, user, setViewing, setEditing }) => {

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
              <ModalHeader className="flex justify-center text-center flex-col gap-1">
                User Details
              </ModalHeader>
              <ModalBody>
              <div className="flex justify-center items-center mb-4">
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className=" w-24 h-24 rounded-lg object-cover"
                  />
              
                </div>
                <h2 className="text-2xl text-center font-semibold mb-4">{user.name}</h2>
                
                <div className="mb-4 flex flex-col justify-center items-center text-center"> 
                  <h3 className="font-semibold mb-2">Information</h3>
                  <ul className="mb-4">
                    <li>Email: {user.email}</li>
                    <li>Phone: {user.phone}</li>
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
                    setSelectedUser(user);
                  }}
                  onPress={onClose}
                >
                  Edit
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
