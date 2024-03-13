import prismadb from "@/lib/prismadb";
import CompanionForm from "@/components/CompanionForm";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import ErrorPage from "@/components/ErrorPage";

interface CompanionPageProps {
  params: { companionID: string };
}

const CompanionPageID = async ({ params }: CompanionPageProps) => {
  try {
    const companionIDRegex = /^[0-9a-fA-F]{24}$/; // Matches 24-character hex string
    console.log(`Params Companion ID: ${params.companionID}`);
    const categories = await prismadb.category.findMany();
    if (!companionIDRegex.test(params.companionID)) {
      if (params.companionID === "new") {
        return <CompanionForm initialData={null} categories={categories} />;
      } else {
        return <ErrorPage />;
      }
    } else {
      const userLoggedInId = auth();

      if (!userLoggedInId) {
        return redirectToSignIn();
      }
      const companion = await prismadb.companion.findUnique({
        where: {
          id: params.companionID,
        },
      });
      if (userLoggedInId.userId !== companion?.userId) return <ErrorPage />;

      return <CompanionForm initialData={companion} categories={categories} />;
    }
  } catch (error: any) {
    console.error("Error fetching companion:", error.message);
  }
};

export default CompanionPageID;
