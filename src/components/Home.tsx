import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { useResizeDetector } from "react-resize-detector";

import me from "../assets/me.avif";
import { cn } from "../utils";

const text1 = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magnam aliquam
quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore
dolemus, fieri tamen permagna accessio potest, si aliquod aeternum
et infinitum impendere malum nobis opinemur. Quod idem licet
transferre in voluptatem, ut postea.
`;

const text2 = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem.
Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna
accessio potest, si aliquod aeternum et infinitum impendere malum nobis
opinemur. Quod idem licet transferre in voluptatem, ut.
`;

export function ArticleBlock(props: {
  className?: string;
  title?: string;
  children: ComponentChildren;
}) {
  return (
    <article className={cn("text-lg font-light", props.className)}>
      <h1 className="text-2xl font-medium">{props.title}</h1>
      <p>{props.children}</p>
    </article>
  );
}

function PaddingBlock() {
  return <div className="pt-16 sm:pt-48"></div>;
}

export default function Home() {
  const { width, height, ref } = useResizeDetector();
  const [imageLoaded, setImageLoaded] = useState(false);

  function HeightBlock(props: {
    className?: string;
    children: ComponentChildren;
  }) {
    return (
      <div
        style={{ ["--min-height" as string]: `${height}px` }}
        className={cn(
          "flex flex-col justify-center sm:min-h-[var(--min-height)]",
          props.className,
        )}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col-reverse items-center py-4 sm:flex-row sm:[align-items:_unset] sm:py-12 sm:ps-4 sm:pe-8 md:py-20 md:ps-16 md:pe-20",
        { hidden: !imageLoaded },
      )}
    >
      <div className="z-10 flex min-w-0 flex-col">
        <div
          style={{
            ["--min-height" as string]: `${height}px`,
            ["--width" as string]: `${width}px`,
          }}
          className="animate-fade-up animate-duration-[1400ms] animate-delay-[600ms] animate-ease-[cubic-bezier(0.4,0.5,0.25,1.0)] flex w-[var(--width)] flex-col justify-center self-center motion-reduce:animate-none sm:min-h-[var(--min-height)] sm:w-full"
        >
          <div className="pt-10 text-5xl font-semibold sm:w-full sm:pt-0 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            <h1 className="inline-block">Hi, I&apos;m</h1>
            <br />
            <h1 className="inline bg-gradient-to-br from-amber-400 via-pink-500 to-indigo-500 to-80% bg-clip-text text-transparent drop-shadow-[0_0_6px_rgb(0,0,0)]">
              Antonia
              <br />
              Schwennesen
            </h1>
          </div>
        </div>
        <div className="animate-fade-up animate-duration-[1400ms] animate-delay-[600ms] animate-ease-[cubic-bezier(0.4,0.5,0.25,1.0)] motion-reduce:animate-none sm:pr-10">
          <PaddingBlock />
          <HeightBlock className="gap-5">
            <ArticleBlock>{text1}</ArticleBlock>
            <ArticleBlock className="hidden lg:block" title="Interessen">
              {text2}
            </ArticleBlock>
          </HeightBlock>
          <div className="lg:hidden">
            <PaddingBlock />
            <HeightBlock>
              <ArticleBlock className="block" title="Interessen">
                {text2}
              </ArticleBlock>
            </HeightBlock>
          </div>
        </div>
      </div>
      <img
        ref={ref}
        src={me.src}
        alt="An image from me"
        width={me.width}
        height={me.height}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        className="animate-fade-left animate-duration-[2000ms] animate-delay-[200ms] animate-ease-[cubic-bezier(0.4,0.5,0.25,1.0)] sticky z-auto h-fit w-full max-w-sm rounded-xl border border-slate-500 motion-reduce:animate-none sm:top-[6.5rem] sm:max-w-none sm:min-w-[45%] md:top-[8.5rem] md:min-w-[47%] lg:min-w-[43%]"
      ></img>
    </div>
  );
}
