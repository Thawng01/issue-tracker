import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";

export default async function Home() {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgess = await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
    });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Flex direction="column" gap="5">
                <IssueSummary
                    open={open}
                    inProgress={inProgess}
                    closed={closed}
                />
                <IssueChart
                    open={open}
                    inProgress={inProgess}
                    closed={closed}
                />
            </Flex>
            <LatestIssue />
        </Grid>
    );
}

export const metadata: Metadata = {
    title: "Issue Tracker - Issues Dashboard",
    description: "View Issues Dashboard",
};
