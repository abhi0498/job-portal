import React from "react";
import { Flex, Text, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("HomePage");
  return (
    <Flex
      as="footer"
      direction={{ base: "column", sm: "row" }}
      gap={2}
      py={6}
      w="full"
      flexShrink={0}
      align="center"
      px={{ base: 4, md: 6 }}
      borderTop="1px"
      borderColor="gray.200"
    >
      <Text fontSize="xs" color="gray.500">
        {t("footer.copyright")}
      </Text>
      <HStack as="nav" ml={{ sm: "auto" }} gap={{ base: 4, sm: 6 }}>
        <Link
          as={NextLink}
          href="#"
          fontSize="xs"
          _hover={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          {t("footer.terms")}
        </Link>
        <Link
          as={NextLink}
          href="#"
          fontSize="xs"
          _hover={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          {t("footer.privacy")}
        </Link>
      </HStack>
    </Flex>
  );
};

export default Footer;
