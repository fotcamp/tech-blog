import styles from "./page.module.css";
import { Box } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box>Radix UI Component</Box>
    </main>
  );
}
