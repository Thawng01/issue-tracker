import IssueFormSkeleton from "@/app/components/IssueFormSkeleton";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_component/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
    return <IssueForm />;
};

export default NewIssuePage;
