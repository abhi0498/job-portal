"use client";
import { useState } from "react";
import { Button, Input, Textarea, Select, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { LuPlusCircle } from "react-icons/lu";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogFooter,
  DialogCloseTrigger,
  DialogActionTrigger,
} from "@/components/ui/dialog";
import {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const jobTypes = createListCollection({
  items: [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ],
});

export default function PostJobModal() {
  const router = useRouter();

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setJobData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
    setJobData({
      title: "",
      company: "",
      location: "",
      type: "",
      salary: "",
      description: "",
    });
    setOpen(false);
    router.refresh();
  };
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <LuPlusCircle /> Post New Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Field label="Job Title">
                <Input
                  name="title"
                  value={jobData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior React Developer"
                  required
                />
              </Field>

              <Field label="Company">
                <Input
                  name="company"
                  value={jobData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. TechViet Corp"
                  required
                />
              </Field>

              <Field label="Location">
                <Input
                  name="location"
                  value={jobData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Ho Chi Minh City"
                  required
                />
              </Field>

              <Field label="Job Type">
                <SelectRoot collection={jobTypes}>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.items.map((item) => (
                      <SelectItem key={item.value} item={item} />
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>

              <Field label="Salary Range">
                <Input
                  name="salary"
                  value={jobData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g. $2,000 - $3,500"
                  required
                />
              </Field>

              <Field label="Job Description">
                <Textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  placeholder="Enter job description..."
                  required
                />
              </Field>

              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </DialogActionTrigger>
                <Button type="submit" colorScheme="blue">
                  Post Job
                </Button>
              </DialogFooter>
            </VStack>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
