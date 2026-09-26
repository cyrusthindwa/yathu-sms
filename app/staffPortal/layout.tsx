"use client";
import StaffSideBarMenu from "@/components/ui/staffSideMenu";
import styles from "./styles/staffportal.module.css";
import { usePathname } from "next/navigation";
import StaffTopAppBar from "@/components/ui/staffTopAppBar";
import { StaffPortalProvider } from "./StaffPortalContext";

export default function StaffPortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname();

    const isLoginPage = pathname === "/staffPortal";
    return (
        <StaffPortalProvider>
        <div className={styles.staffPortal}>
            {!isLoginPage && <StaffSideBarMenu />}
            <main className={styles.content}>
                {!isLoginPage && <StaffTopAppBar />}
                {children}
            </main>
        </div>
        </StaffPortalProvider>
    );
}