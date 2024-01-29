import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required.")
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, "Title is required.").optional(),
    description: z.string().min(1, "Description is required.").optional(),
    assignedUserId: z.string().min(1, "AssignedUserId is required.").optional()
});
