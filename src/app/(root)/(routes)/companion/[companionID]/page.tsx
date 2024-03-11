import prismadb from "@/lib/prismadb";
import CompanionForm from "@/components/CompanionForm";

interface CompanionPageProps {
  params: { companionID: string };
}

const CompanionPageID = async ({ params }: CompanionPageProps) => {
  try {
    const companionIDRegex = /^[0-9a-fA-F]{24}$/; // Matches 24-character hex string
    console.log(`Params Companion ID: ${params.companionID}`);

    if (!companionIDRegex.test(params.companionID)) {
      throw new Error("Invalid companionID format!");
    }

    const companion = await prismadb.companion.findUnique({
      where: { id: params.companionID },
    });

    const categories = await prismadb.category.findMany();

    return <CompanionForm initialData={companion} categories={categories} />;

    // Display companion data or handle success scenario
  } catch (error: any) {
    console.error("Error fetching companion:", error.message);
    // Display error message to the user (e.g., "Invalid companion ID")
  }
};

export default CompanionPageID;
