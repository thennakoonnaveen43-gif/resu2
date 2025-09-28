import { presetSettings, StyleSettings } from "@shared/schema";

export const templateDefaultSizing: StyleSettings[] = [
    {
        headerFontSize: 18,
        bodyFontSize: 12,
        sectionSpacing: 16,
        sidebarSectionSpacing: 16,
        lineHeight: 1.5,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        sidebarWidth: 40,
        aboutMePlacement: "sidebar",
        referencePlacement: "sidebar",
        colors: {
            primary: "#3b82f6",
            secondary: "#64748b",
            accent: "#06b6d4",
            background: "#ffffff",
            sidebarBackground: "#1e293b",
            headerTextColor: "#1e293b",
            bodyTextColor: "#374151",
            sidebarTextColor: "#ffffff",
        }
    }
]