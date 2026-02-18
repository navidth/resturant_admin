'use client'
import { Menu, MenuProps } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { usePathname } from 'next/navigation';
import { useMemo } from 'react'
import { menuItems } from '../lib/constants';
import Link from 'next/link';

const itemsMenu = menuItems.map((key) =>
      key.link && typeof key.link == "string" && ({
            key: key.link,
            label: <Link href={key.link}>{key.label}</Link>,
      })
).filter(Boolean) as MenuProps["items"];

const Navbar = () => {
      const pathname = usePathname();

      const selectedKeys = useMemo(() => {
            const normalizedPath = (pathname || "/").trim();

            const candidates = menuItems
                  .map((i) => (i.link ?? "").trim())
                  .filter(Boolean)
                  .filter((link) => link === "/" ? normalizedPath === "/" : (normalizedPath === link || normalizedPath.startsWith(link + "/")));

            const best = candidates.sort((a, b) => b.length - a.length)[0];

            return best ? [best] : [];
      }, [pathname]);
      return (
            <Header style={{ display: "flex", justifyContent: "space-between", width:"100%" }}>
                  <div className='text-white'>LOGO</div>
                  <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={selectedKeys}
                        items={itemsMenu}
                        className=''

                  />
                  <div></div>
            </Header>
      )
}

export default Navbar