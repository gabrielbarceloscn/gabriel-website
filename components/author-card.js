import React from "react";
import {
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  Button,
  useClipboard,
  Stack,
  useColorModeValue,
  Badge
} from "@chakra-ui/react"
import { format, render, cancel, register } from "timeago.js";
import {
  LinkIcon,
  CheckIcon,
} from "@heroicons/react/solid";


const AuthorCard = ({ readingTime, publishedAt, updatedAt, url , tags}) => {
  const { hasCopied, onCopy } = useClipboard(url);
  const publishedDate = publishedAt ? new Date(publishedAt) : null;
  const updatedDate = updatedAt ? new Date(updatedAt) : null;
  const differenceTimeToIgnoreUpdatedChangesTime = 1000*60*2;//2 minutes
  return (
      <Stack direction="row" justify="space-between">
        <HStack>
          <Avatar src="/avatar-small.jpg" h={10} w={10}/>
          <VStack spacing={0} align="start">
            <Text fontSize="md" fontWeight="500">
              Gabriel Barcelos
            </Text>
            <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.200")}>
              {publishedAt && format(publishedAt, 'pt-BR')}
              {
                Math.abs(publishedDate?.getTime() - updatedDate?.getTime()) > differenceTimeToIgnoreUpdatedChangesTime && (
                    <> • atualizado {format(updatedAt, 'pt-BR')}</>
                )
              }
            </Text>
            <ul>
              {tags?.map((tag,index)=>{
                return (
                    <Badge mr="2" key={index}>
                      {tag}
                    </Badge>
                )
              })}
            </ul>
          </VStack>
        </HStack>
        <HStack>
          <Button
              onClick={onCopy}
              ml={2}
              variant="outline"
              size={["sm"]}
              color={
                hasCopied
                    ? useColorModeValue("green.600", "green.200")
                    : useColorModeValue("gray.800", "gray.100")
              }
              bg={useColorModeValue("white", "gray.800")}
              leftIcon={hasCopied ? <CheckIcon size={18} /> : <LinkIcon size={18} />}
          >
            {hasCopied ? "Copiado" : "Copiar Link"}
          </Button>
        </HStack>
      </Stack>
  );
};

export default AuthorCard;
