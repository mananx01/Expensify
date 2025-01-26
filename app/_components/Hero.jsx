"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

function Hero() {
  const { user, isSignedIn } = useUser();

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold sm:text-6xl text-green-400">
            Track Effortlessly
            <motion.strong
              className="font-extrabold text-green-800 sm:block"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            >
              Split Seamlessly
            </motion.strong>
          </h1>

          <motion.p
            className="mt-6 sm:text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Handle expenses with ease, so you can focus on what truly matters.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-red-800 px-12 py-3 text-sm font-medium text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring active:bg-green-700 sm:w-auto"
            >
              Get Started
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={"/newdashboard.png"}
          alt="Expensify Dashboard"
          width={900}
          height={500}
          className="rounded-xl border-4 border-green-600 shadow-lg"
        />
      </motion.div>
    </section>
  );
}

export default Hero;
