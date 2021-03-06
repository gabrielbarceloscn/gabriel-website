import React from "react";
import {
    Box,
    Center,
    HStack,
    IconButton,
    useColorModeValue,
    Button,
    VStack,
    Link, Text
} from "@chakra-ui/react";
import {RssIcon} from "@heroicons/react/solid";

import {motion, useCycle} from "framer-motion";
import MenuToggle from "./mobile-menu-toggle";
import ThemeToggle from "./theme-toggle";
import {SunIcon} from "@heroicons/react/outline";

const MobileNavigation = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);

    const menuvariants = {
        open: {
            opacity: 1,
        },
        closed: {
            opacity: 0,
        },
    };

    const navvariants = {
        open: {
            transition: {staggerChildren: 0.15, delayChildren: 0.25},
        },
        closed: {},
    };

    const MotionBox = motion.custom(Box);
    const MotionVStack = motion.custom(VStack);

    return (
        <MotionBox
            initial="false"
            animate={isOpen ? "open" : "closed"}
            position="fixed"
            bottom="0"
            right="0"
            left="0"
            display={{base: "block", md: "none"}}
        >
            <HStack
                justify="space-around"
                align="center"
                py={2}
                mt="auto"
                height={16}
                bg={useColorModeValue("white", "gray.800")}
                borderTopWidth="2px"
                borderTopColor={useColorModeValue("gray.100", "gray.700")}
                shadow="0 -2px 10px 0 rgba(0,0,0, 0.035);"
            >
                {/*<NewsletterDrawer mobile />*/}
                <MenuToggle/>
                <Link href={'/blog'}>
                    <VStack
                        as="button"
                        spacing={0}
                        rounded="md"
                        px={6}
                        color={useColorModeValue("blue.600", "blue.200")}
                    >
                        <RssIcon width={22} height={22}/>
                        <Text
                            fontSize="xs"
                            fontWeight="500"
                            color={useColorModeValue("gray.600", "gray.200")}
                        >
                            Blog
                        </Text>
                    </VStack>
                </Link>
                <ThemeToggle mobile/>
            </HStack>
        </MotionBox>
    );
};

export default MobileNavigation;
