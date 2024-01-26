import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const Loading = () => {
    return (
        <Box className="max-w-xl space-y-5">
            <Skeleton height="2rem" />
            <Skeleton height="20rem" />
            <Skeleton height="3rem" width="5rem" />
        </Box>
    );
};

export default Loading;
