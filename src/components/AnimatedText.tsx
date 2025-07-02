import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  script?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "", script = false }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className={`inline-block ${className} ${script ? 'font-script' : ''}`}
    >
      {text}
    </motion.span>
  );
};

export default AnimatedText;