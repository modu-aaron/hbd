import TalkTalkView from "@/components/talktalk/view";
import { notFound } from "next/navigation";

export const runtime = "edge";

const TalkTalkPage = () => {
  if (process.env.NODE_ENV === "production") return notFound();

  return <TalkTalkView />;
};
export default TalkTalkPage;
