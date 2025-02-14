"use client";

import Question from "@/app/(homepage)/components/question";

export default function MainPage() {
  console.log("MainPage");
  const steps = [
    {
      question: "hey paula! vrei sa fii valentine-ul meu? 💌",
      image: "https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp",
      yesText: "da, da, da! 😍",
      noText: "nu, nu, nu! 😢",
    },
    {
      question: "nu manebunii cf?? 💓",
      image: "https://i.giphy.com/yedDQGWwq0heU.webp",
      yesText: "da, da, da!",
      noText: "nu, nu, nu!",
    },
    {
      question: "pleaeeasesee 🌟",
      image:
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2k4eGdlMnBlOTdoamJyd21rNTgzcXpqenF6Mjg5bmZvaWZlb3ZyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3OhXBaoR1tVPW/giphy.gif",
      yesText: "aww! 🥰",
      noText: "nah 🌑",
    },
    {
      question: "pleasssee 🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹",
      image: "https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp",
      yesText: "daaaaaa! 💘",
      noText: "keep walking 🚶‍♀️",
    },
  ];
  return (
    <div className="min-h-screen bg-pink-100 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Question
          finalStep={{
            question: "YAYYYYYYYYYY i love you darling 😍😍😍😍😍",
            image: "https://i.giphy.com/lck9f0L8jPjRtkigYy.webp",
          }}
          steps={steps}
        />
      </div>
    </div>
  );
}
