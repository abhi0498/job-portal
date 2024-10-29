import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { LuBuilding2, LuSearch, LuTrendingUp, LuUsers } from "react-icons/lu";

export default function Component() {
  const t = useTranslations("HomePage");

  const featuredJobs = [
    {
      key: "softwareEngineer",
      title: "Software Engineer",
      company: "Google",
      location: "Hanoi, Vietnam",
      salary: "1000000 VND",
    },
    {
      key: "marketingSpecialist",
      title: "Marketing Specialist",
      company: "Facebook",
      location: "Hanoi, Vietnam",
      salary: "1000000 VND",
    },
    {
      key: "projectManager",
      title: "Project Manager",
      company: "Amazon",
      location: "Hanoi, Vietnam",
      salary: "1000000 VND",
    },
  ];

  const features = [
    {
      icon: <LuTrendingUp size={30} />,
      title: t("whyUs.features.diverse.title"),
      description: t("whyUs.features.diverse.description"),
    },
    {
      icon: <LuUsers size={30} />,
      title: t("whyUs.features.direct.title"),
      description: t("whyUs.features.direct.description"),
    },
    {
      icon: <LuBuilding2 size={30} />,
      title: t("whyUs.features.reputable.title"),
      description: t("whyUs.features.reputable.description"),
    },
  ];

  return (
    <Flex direction="column" minH="100vh">
      <Box as="main" flex="1">
        <Box as="section" w="full" pt={{ base: 12, md: 24, lg: 32 }}>
          <Container px={{ base: 4, md: 6 }}>
            <VStack gap={4} align="center" textAlign="center">
              <VStack gap={2}>
                <Heading
                  fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="bold"
                  letterSpacing="tighter"
                  color="white"
                >
                  {t("hero.title")}
                </Heading>
                <Text
                  maxW="700px"
                  mx="auto"
                  color="gray.200"
                  pt={6}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("hero.subtitle")}
                </Text>
              </VStack>
              <Box w="full" maxW="sm" gap={2}>
                <HStack as="form" gap={2}>
                  <Input
                    maxW="lg"
                    flex="1"
                    p={4}
                    placeholder={t("hero.searchPlaceholder")}
                    type="text"
                  />
                  <Button type="submit" colorPalette={"gray"}>
                    <LuSearch size={4} /> {t("hero.searchButton")}
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </Container>
        </Box>

        <Box as="section" w="full" pt={{ base: 6, md: 12, lg: 24 }}>
          <Container px={{ base: 4, md: 6 }}>
            <Heading
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              fontWeight="bold"
              letterSpacing="tighter"
              textAlign="center"
              mb={8}
            >
              {t("featured.title")}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {featuredJobs.map((job) => (
                <Card.Root key={job.key}>
                  <Card.Body p={4}>
                    <Heading as="h3" fontSize="lg" fontWeight="bold" mb={2}>
                      {job.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      {job.company}
                    </Text>
                    <Flex justify="space-between" align="center">
                      <Badge variant="secondary">{job.location}</Badge>
                      <Text fontSize="sm" fontWeight="medium">
                        {job.salary}
                      </Text>
                    </Flex>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
            <Box mt={10} textAlign="center">
              <Button>{t("featured.viewMore")}</Button>
            </Box>
          </Container>
        </Box>

        <Box as="section" w="full" py={{ base: 6, md: 12, lg: 24 }}>
          <Container px={{ base: 4, md: 6 }}>
            <Heading
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              fontWeight="bold"
              letterSpacing="tighter"
              textAlign="center"
              mb={12}
            >
              {t("whyUs.title")}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
              {features.map((feature, index) => (
                <Card.Root key={index}>
                  <Card.Body p={6}>
                    <VStack align="center" textAlign="center">
                      <Box mb={4} color="primary">
                        {feature.icon}
                      </Box>
                      <Heading as="h3" fontSize="lg" fontWeight="bold" mb={2}>
                        {feature.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.500">
                        {feature.description}
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    </Flex>
  );
}
