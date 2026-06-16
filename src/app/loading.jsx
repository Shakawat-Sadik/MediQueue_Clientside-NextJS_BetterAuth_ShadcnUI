"use client";

import React from "react";
import { ActivityIcon } from "@/components/ui/activity";
import Loader from "@/components/kokonutui/loader";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-background transition-colors duration-300">
      <div className="flex flex-col items-center gap-4 max-w-xs text-center">
        {/* <Loader /> */}
        {/* Animated pulsing icon container */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-primary-foreground/50 text-primary font-bold tracking-tight p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md">
          <ActivityIcon className="animate-ping h-7 w-7" />
        </div>
        <h1
          className={cn(
            "text-foreground leading-[1.15] tracking-[-0.02em] antialiased dark:text-foreground text-xl font-bold",
          )}
        >
          <span
            className="text-foreground"
          >
            Medi
          </span>
          <span
            className="text-primary"
          >
            Queue
          </span>
        </h1>
        {/* <span className=""></span> */}

        {/* Loading text details */}
        <div>
          <p className="text-[11px] text-muted-foreground font-semibold mt-1 animate-pulse">
            is reaching you shortly...
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-card rounded-full overflow-hidden mt-2 relative">
          <div className="absolute top-0 bottom-0 left-0 w-full bg-brand-600 dark:bg-brand-400 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
}

/*

        <motion.h1
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={cn(
            config.titleClass,
            "text-foreground leading-[1.15] tracking-[-0.02em] antialiased dark:text-foreground text-xl font-bold",
          )}
          initial={{ opacity: 0, y: 12 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.span
            animate={{
              opacity: [0.6, 0.4, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.4, 0, 0.6, 1],
            }}
            className="text-foreground"
          >
            Medi
          </motion.span>
          <motion.span
            animate={{
              opacity: [0.9, 0.7, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.4, 0, 0.6, 1],
            }}
            className="text-primary"
          >
            Queue
          </motion.span>
        </motion.h1>
*/

/*

        <motion.div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex items-center justify-center w-[60%] h-[60%] bg-primary-foreground/50 text-primary font-bold tracking-tight rounded-full">
            <ActivityIcon className="animate-ping w-1/2 h-1/2" />
          </div>
        </motion.div>
*/
