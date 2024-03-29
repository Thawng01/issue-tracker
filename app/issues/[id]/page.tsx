import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";

import IssueEditButton from "./IssueEditButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

const fetchIssue = cache((issueId: string) =>
    prisma.issue.findUnique({ where: { id: issueId } })
);

interface Props {
    params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await fetchIssue(params.id);

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetail issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect issue={issue} />
                        <IssueEditButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: { params: { id: string } }) {
    const issue = await fetchIssue(params.id);

    return {
        title: issue?.title,
        description: "View An Issue" + issue?.id,
    };
}
