import { Button } from "@/components/ui/button";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareCardDialogProps {
  cardUrl: string;
  onClose: () => void;
}

export default function ShareCardDialog({
  cardUrl,
  onClose,
}: ShareCardDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Valentine&apos;s Card 💝",
          text: "Check out this Valentine&apos;s card I made for you!",
          url: cardUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <h2 className="text-2xl font-bold text-pink-500 mb-4">
          Card Created! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your Valentine&apos;s card is ready! Share it with your special
          someone:
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={cardUrl}
              readOnly
              className="flex-1 p-2 border rounded-lg bg-gray-50"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="min-w-[100px]"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={shareCard}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Card
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              View Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
