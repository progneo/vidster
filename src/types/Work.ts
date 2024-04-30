import Creator from "@/src/types/Creator";

export default interface Work {
  id: number
  url: string
  creatorId: number
  creator: Creator | undefined
}