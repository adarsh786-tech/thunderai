"use client";

import { Category, Companion } from "@prisma/client";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {};
export default CompanionForm;
