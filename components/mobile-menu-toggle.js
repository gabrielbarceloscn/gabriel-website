import React from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Input,
  Button,
  VStack,
  FormControl,
  Alert,
  AlertIcon,
  FormLabel,
  FormHelperText,
  Textarea,
  Tooltip,
  SimpleGrid,
} from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import MobileMenuButton from "./mobile-menu-button";
import MobileMenuItem from "./mobile-menu-item";
import {SunIcon} from "@heroicons/react/outline";

const MobileMenuToggle = ({ mobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();
  const onSubmit = async (data) => {
    await sendSuggestion(data);
  };

  return (
    <Box>
      <Tooltip label="Newsletter">
        <MobileMenuButton label="Menu" icon={<MenuIcon width={22} height={22} />} onClick={onOpen} />
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent borderTopRadius="6px">
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody pb={4}>
              <VStack>
                <MobileMenuItem href="/" title="Sobre mim" />
                {/*<MobileMenuItem href="/about" title="About" />*/}
                {/*<MobileMenuItem href="/blog" title="Blog" />*/}
                <MobileMenuItem href="/bookmarks" title="Links úteis" />
                <SimpleGrid columns={2} spacing={2} w="100%">
                  <MobileMenuItem href="/books" title="Biblioteca" />
                  <MobileMenuItem href="/tools" title="Apps favoritos" />
                </SimpleGrid>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default MobileMenuToggle;
