export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Energy Monitor Esp32",
  description: "Monitor your energy usage with ease",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/monitor",
    },

    {
      label: "History",
      href: "/history",
    },
    {
      label: "Automation",
      href: "/automation",
    },

    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/monitor",
    },

    {
      label: "History",
      href: "/history",
    },
    {
      label: "Automation",
      href: "/automation",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/siddhartha-up80/esp32energymonitor",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
