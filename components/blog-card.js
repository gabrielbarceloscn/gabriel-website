import React from "react";
import Link from "next/link";
import { format } from "timeago.js";
import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Tag,
  HStack,
} from "@chakra-ui/react";

const BlogCard = ({ slug, publishDate, updateDate, description, title, pinned }) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Box
        as="a"
        cursor="pointer"
        w="100%"
        transition="all 0.25s"
        transition-timing-function="spring(1 100 10 10)"
        _hover={{ transform: "translateY(-4px)", shadow: "sm" }}
      >
        <VStack
          align="start"
          p={4}
          bg={useColorModeValue("white", "gray.800")}
          rounded="xl"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.100", "gray.700")}
          spacing={0}
        >
          <HStack>
            <Text
                color={useColorModeValue("blue.500", "blue.200")}
                fontWeight="bold"
                fontSize="xl"
            >
              {title}{" "}
              {pinned ?
                  new Date() - new Date(updateDate) < 1000 * 60 * 60 * 24 * 3 && (
                      <Tag size="md" mt={1} ml={1} colorScheme="blue">
                        Atualizado
                      </Tag>
                  )
                  :
                  new Date() - new Date(publishDate) < 1000 * 60 * 60 * 24 * 3 && (
                      <Tag size="md" mt={1} ml={1} colorScheme="purple">
                        Novo
                      </Tag>
                  )
              }
              {pinned && (
                  <Tag size="md" mt={1} ml={1} colorScheme="red">
                    Fixado no topo
                  </Tag>
              )}
            </Text>
          </HStack>

          <Text fontSize="lg" color={useColorModeValue("gray.700", "gray.50")}>
            {description}
          </Text>
          <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.400")}>
            {format(publishDate)}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default BlogCard;
