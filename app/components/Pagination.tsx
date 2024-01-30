import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    return (
        <Flex align="center" gap="2">
            <Text>
                Page {currentPage} of {pageCount}
            </Text>

            <Button color="gray" variant="soft" disabled={currentPage === 1}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color="gray" variant="soft">
                <ChevronLeftIcon />
            </Button>
            <Button color="gray" variant="soft">
                <ChevronRightIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    );
};

export default Pagination;
