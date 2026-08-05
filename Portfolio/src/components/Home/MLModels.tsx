import React from "react";
import { motion, Variants } from "framer-motion";
import { Brain, Cpu, Database, Scale, Tag, ExternalLink } from "lucide-react";

/* ===================== Types ===================== */

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

/* ===================== Data ===================== */

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

/* ===================== Animations ===================== */

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

/* ===================== Component ===================== */

const MLModels: React.FC = () => {
  return (
    <section id="ml-models" className="scroll-mt-14 py-8 lg:py-16 bg-[#0B0F17] text-white">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8 sm:mb-12">
          <h2 className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.1] tracking-tight font-funnel text-white">
            Machine Learning
            <br />
            <span className="font-light text-[#00FF66]">
              Models & Research
            </span>
          </h2>

          <p className="mt-4 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-sans">
            Custom-trained and fine-tuned machine learning models designed for
            Natural Language Processing, recommendation engines, and semantic search.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="bg-[#131924] border border-neutral-800 rounded-2xl text-white shadow-xl overflow-hidden"
          >
            <div
              className="
                grid grid-cols-1 gap-8 p-5 sm:p-8 md:p-12
                lg:grid-cols-[1fr_1.2fr]
              "
            >
              {/* Left Column */}
              <motion.div variants={fadeUp} className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#00FF66] font-funnel">
                    Deployed ML Models
                  </h3>

                  <p className="mt-3 leading-relaxed max-w-md text-neutral-300 text-sm sm:text-base">
                    Custom model checkpoints hosted on Hugging Face, optimized for embedding
                    generation and sentence similarity tasks.
                  </p>
                </div>

                <div className="mt-6 sm:mt-8">
                  <div className="flex items-center gap-2 text-xs text-[#00FF66] font-mono">
                    <Brain className="animate-pulse shrink-0" size={14} />
                    <span>Active Deployment</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Model Details */}
              <motion.div variants={fadeUp} className="space-y-6 flex flex-col justify-between pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-800/80">
                <div>
                  {/* Model Header */}
                  <div className="flex items-center gap-2.5">
                    <Cpu size={18} className="text-[#00FF66] shrink-0" />
                    <span className="font-mono text-sm sm:text-base md:text-lg font-bold break-all text-white">
                      {mlModel.name}
                    </span>
                  </div>

                  {/* Model Description */}
                  <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-neutral-300">
                    {mlModel.description}
                  </p>

                  {/* Meta Tags */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <Tag size={14} className="text-[#00FF66] shrink-0" />
                      <span className="truncate">Task: {mlModel.tags.task}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <Cpu size={14} className="text-[#00FF66] shrink-0" />
                      <span className="truncate">Library: {mlModel.tags.library}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <Database size={14} className="text-[#00FF66] shrink-0" />
                      <span className="truncate" title={`Dataset: ${mlModel.tags.dataset}`}>
                        Dataset: {mlModel.tags.dataset}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <Scale size={14} className="text-[#00FF66] shrink-0" />
                      <span className="truncate">License: {mlModel.tags.license}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2 sm:pt-4">
                  <a
                    href={mlModel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full sm:w-auto
                      inline-flex items-center justify-center gap-2
                      rounded-full
                      border border-[#00FF66]/30
                      bg-[#00FF66]/10
                      px-5 py-2.5
                      text-xs font-medium tracking-wide
                      text-[#00FF66]
                      transition-all duration-300
                      hover:bg-[#00FF66]
                      hover:text-black
                      hover:shadow-lg
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

export default MLModels;
