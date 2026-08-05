import React from "react";
import { motion, Variants } from "framer-motion";
import { Brain, Cpu, Database, Scale, Tag, ExternalLink } from "lucide-react";

interface MLModel {
  name: string;
  description: string;
  link: string;
  tags: {
    library: string;
    task: string;
    dataset: string;
    license: string;
  };
}

const mlModel: MLModel = {
  name: "cs22/book-engine",
  description:
    "A fine-tuned sentence-similarity model built with Sentence Transformers and trained on the google/extended_amazon_2023_dataset. Optimized to generate high-quality semantic vector embeddings for books to power search and recommendation systems.",
  link: "https://huggingface.co/cs22/book-engine",
  tags: {
    library: "Sentence Transformers",
    task: "Sentence Similarity",
    dataset: "extended_amazon_2023_dataset",
    license: "Apache 2.0",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const LightMLModels: React.FC = () => {
  return (
    <section id="ml-models" className="scroll-mt-14 py-8 lg:py-16 bg-[#F6F5F2] text-[#222222]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-10 lg:mb-15">
          <h2 className="text-[clamp(3.2rem,7vw,5.5rem)] font-extrabold leading-[1.1] tracking-tight font-funnel text-[#222222]">
            Machine Learning
            <br />
            <span className="font-light text-neutral-500">
              Models & Research
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-neutral-600 leading-relaxed font-sans">
            Custom-trained and fine-tuned machine learning models designed for
            Natural Language Processing, recommendation engines, and semantic search.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="bg-[#222222] rounded-2xl text-[#F6F5F2] shadow-xl"
          >
            <div
              className="
                grid grid-cols-1 gap-10 px-6 py-8 sm:px-10 sm:py-12
                lg:grid-cols-[1fr_1.2fr]
              "
            >
              {/* Left Column */}
              <motion.div variants={fadeUp} className="flex flex-col justify-between">
                <div>
                  <h3 className="text-[clamp(1.6rem,4vw,2.2rem)] font-semibold tracking-tight font-funnel text-[#F6F5F2]">
                    Deployed ML Models
                  </h3>

                  <p className="mt-4 leading-relaxed max-w-md text-[#F6F5F2]/80 text-sm sm:text-base">
                    Custom model checkpoints hosted on Hugging Face, optimized for embedding
                    generation and sentence similarity tasks.
                  </p>
                </div>

                <div className="mt-8 hidden lg:block">
                  <div className="flex items-center gap-2 text-xs text-[#F6F5F2]/60 font-mono">
                    <Brain className="animate-pulse" size={14} />
                    <span>Active Deployment</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Model Details */}
              <motion.div variants={fadeUp} className="space-y-6 flex flex-col justify-between">
                <div>
                  {/* Model Header */}
                  <div className="flex items-center gap-3">
                    <Cpu size={18} className="text-[#F6F5F2]" />
                    <span className="font-mono text-base sm:text-lg font-bold break-all text-[#F6F5F2]">
                      {mlModel.name}
                    </span>
                  </div>

                  {/* Model Description */}
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#F6F5F2]/90">
                    {mlModel.description}
                  </p>

                  {/* Meta Tags */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#F6F5F2]/80">
                      <Tag size={14} className="opacity-75" />
                      <span>Task: {mlModel.tags.task}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#F6F5F2]/80">
                      <Cpu size={14} className="opacity-75" />
                      <span>Library: {mlModel.tags.library}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#F6F5F2]/80">
                      <Database size={14} className="opacity-75" />
                      <span className="truncate">Dataset: {mlModel.tags.dataset}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#F6F5F2]/80">
                      <Scale size={14} className="opacity-75" />
                      <span>License: {mlModel.tags.license}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href={mlModel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      border border-[#F6F5F2]/20
                      bg-[#F6F5F2]/10
                      px-5 py-2.5
                      text-xs font-medium tracking-wide
                      text-[#F6F5F2]
                      transition-all duration-300
                      hover:bg-[#F6F5F2]
                      hover:text-[#222222]
                      hover:shadow-lg
                      hover:scale-[1.03]
                    "
                    aria-label="View on Hugging Face"
                  >
                    View on Hugging Face
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LightMLModels;
