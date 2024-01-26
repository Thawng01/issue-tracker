import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";

import IssueEditButton from "./IssueEditButton";
import IssueDetail from "./IssueDetail";

interface Props {
    params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }}>
            <Box>
                <IssueDetail issue={issue} />
            </Box>
            <Box>
                <IssueEditButton issueId={issue.id} />
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
