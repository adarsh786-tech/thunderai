import prismadb from "@/lib/prismadb";
import CompanionForm from "@/components/CompanionForm";
interface CompanionPageProps {
  params: { companionID: string };
  //  & { __opaque__: "ObjectID" } };
}

const CompanionPageID = async ({ params }: CompanionPageProps) => {
  try {
    const companionIDRegex = /^[0-9a-fA-F]{24}$/; // Matches 24-character hex string

    if (!companionIDRegex.test(params.companionID)) {
      throw new Error("Invalid companionID format!");
    }

    const companion = await prismadb.companion.findUnique({
      where: { id: params.companionID },
    });

    // Display companion data or handle success scenario
  } catch (error: any) {
    console.error("Error fetching companion:", error.message);
    // Display error message to the user (e.g., "Invalid companion ID")
  }

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionPageID;
