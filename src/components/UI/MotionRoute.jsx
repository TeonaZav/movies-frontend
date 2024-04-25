import { motion } from "framer-motion";

const MotionRoute = ({ children, animationKey }) => (
  <motion.div
    key={animationKey}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

export default MotionRoute;
