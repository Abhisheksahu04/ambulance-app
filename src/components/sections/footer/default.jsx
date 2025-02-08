import { ModeToggle } from "../../ui/mode-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import LaunchUI from "../../logos/launch-ui";

export default function FooterSection() {
  return (
    (<footer className="w-full bg-white px-4 dark:bg-neutral-950">
      <div className="mx-auto max-w-container">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <LaunchUI />
                <h3 className="text-xl font-bold">Launch UI</h3>
              </div>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Product</h3>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                Changelog
              </a>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                Documentation
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                About
              </a>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                Careers
              </a>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                Blog
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                Discord
              </a>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                Twitter
              </a>
              <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400">
                Github
              </a>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>© 2025 Mikołaj Dobrucki. All rights reserved</div>
            <div className="flex items-center gap-4">
              <a href="/">Privacy Policy</a>
              <a href="/">Terms of Service</a>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>)
  );
}
