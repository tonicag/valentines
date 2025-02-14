import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import Image from "next/image";

// use @giphy/js-fetch-api to fetch gifs
// apply for a new Web SDK key. Use a separate key for every platform (Android, iOS, Web)
const gf = new GiphyFetch("yPOGIXU4v6SwbCd11Y2MDlLvqOVaF651");

interface IGif {
  images: {
    original: {
      url: string;
    };
  };
}

export type GifPickerProps = {
  onGifClick: (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => void;
  className?: string;
  label?: string;
  value?: string;
};

export default function GifPicker({
  onGifClick,
  className,
  label,
  value,
}: GifPickerProps) {
  const [search, setSearch] = useState("cute cats");
  const selectedImage = value || "";
  console.log({ selectedImage });
  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearch(value);
    }, 500);
  }, []);

  const fetchGifs = useCallback(
    (offset: number) => {
      return gf.search(search || "cute cats", { offset, limit: 10 });
    },
    [search]
  );

  const onGifClickHandler = useCallback(
    (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => {
      //   setSelectedImage(gif.images.original.url);
      onGifClick(gif, e);
    },
    [onGifClick]
  );

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 p-2 border-pink-300 border rounded-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <FormLabel className="">{label}</FormLabel>
        <Image src="/giphy.gif" alt="giphy logo" width={100} height={100} />
      </div>
      <div className="flex items-center gap-2 relative">
        <Search className="text-pink-400 w-5 h-5" />
        <Input
          onChange={(e) => debouncedSearch(e.target.value)}
          className="p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search for a gif"
        />
        <div className="absolute w-[calc(100%+16px)] left-0 translate-x-[-8px] h-[1px] bg-pink-300 bottom-0" />
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex-1">
          <ScrollArea>
            <Grid
              className="h-[300px] "
              percentWidth={"100%"}
              width={400}
              columns={3}
              gutter={6}
              fetchGifs={fetchGifs}
              key={search}
              onGifClick={onGifClickHandler}
            />
          </ScrollArea>
        </div>
        <div className="-my-0.5 flex-1 flex items-center justify-center">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="heart"
              width={350}
              height={350}
              className="border-2 border-pink-500 w-full h-[300px] rounded-lg mb-4"
              style={{ objectFit: "contain" }}
            />
          )}
          {!selectedImage && (
            <span className="text-sm font-semibold text-pink-500">
              Select a gif to preview 🖼️☀️
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
