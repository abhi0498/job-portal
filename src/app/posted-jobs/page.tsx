import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Button,
  Badge,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { LuMoreVertical, LuPenSquare, LuTrash2 } from "react-icons/lu";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import PostJobModal from "./job-modal";
import { getPostedJobs } from "@/data/jobs";
import Link from "next/link";
export default async function MyPostedJobs() {
  const postedJobs = await getPostedJobs();

  return (
    <Box display="flex" flexDir="column" minH="100vh">
      <Box as="main" flex="1">
        <Container px={{ base: 0, md: 6 }}>
          <Flex justify="space-between" align="center" mb={8}>
            <Heading>My Posted Jobs</Heading>
            <PostJobModal />
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {postedJobs.map((job) => (
              <Card.Root key={job.id}>
                <Card.Body p={6}>
                  <Flex justify="space-between" align="start" mb={4}>
                    <Stack gap={2}>
                      <Heading size="md">{job.title}</Heading>
                      <Text color="gray.500" fontSize="sm">
                        {job.company}
                      </Text>
                      <Text color="gray.500" fontSize="sm">
                        {job.location}
                      </Text>
                    </Stack>
                    <Box position="relative" w="32px">
                      <MenuRoot closeOnSelect>
                        <MenuTrigger asChild>
                          <IconButton
                            variant="outline"
                            size="sm"
                            w="32px"
                            minW="32px"
                            h="32px"
                            aria-label="More options"
                          >
                            <LuMoreVertical size={16} />
                          </IconButton>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem>Edit Job</MenuItem>
                          <MenuItem color="red.500">Delete Job</MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </Box>
                  </Flex>
                  <Stack direction="row" gap={2} mb={4}>
                    <Badge colorScheme="blue">{job.type || "N/A"}</Badge>
                    <Badge variant="outline">{job.salary || "N/A"}</Badge>
                  </Stack>
                  <Text color="gray.500" fontSize="sm" mb={2}>
                    Posted on: {job.createdAt.toLocaleDateString()}
                  </Text>
                  {job.applicants && (
                    <Text fontWeight="medium" fontSize="sm">
                      Applicants: {job.applicants}
                    </Text>
                  )}
                </Card.Body>
                <CardFooter p={4}>
                  <Link
                    href={`/posted-jobs/${job.id}`}
                    style={{ width: "100%" }}
                  >
                    <Button width="full" colorScheme="blue">
                      View Applicants
                    </Button>
                  </Link>
                </CardFooter>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
