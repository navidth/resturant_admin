'use client'
import { Button, Menu, MenuProps, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { usePathname } from 'next/navigation';
import { useMemo } from 'react'
import { menuItems } from '../lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/logo_UAE_final.png"

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
      const {
            token: { colorBorder },
      } = theme.useToken();
      return (
            <Header style={{ display: "flex", justifyContent: "space-between", gap: 16, width: "100%" }}>
                  <Link href={`/info`} className='text-white! flex items-center justify-center'>
                        <Image src={logo} className='w-13.75' alt='logo hyracn company' />
                  </Link>
                  {/* <Menu
                        theme="dark"
                        mode="horizontal"
                        disabledOverflow
                        selectedKeys={selectedKeys}
                        items={itemsMenu}
                        style={{ minWidth: 0, fontSize: 16, display: "flex", alignItems: "center", padding:"20px", gap:"8px" }}
                        styles={{
                              item: {
                                    padding:0,
                                    borderRadius: borderRadiusLG,
                                    border:`1px solid ${colorInfoBorder}`
                              }
                        }}
                  /> */}
                  <div className='flex items-center gap-3'>
                        {menuItems.map((item) => (
                              <Button href={item.link} key={item.id} variant='outlined' className={` w-20 min-w-16 ${item.link && selectedKeys.includes(item.link) ? `hover:text-inherit!  ` : `bg-inherit! text-white! hover:border-cyan-500! hover:text-cyan-500!`}   `} style={{ borderColor: colorBorder }} size="large">
                                    {item.label}
                              </Button>
                        ))}
                  </div>
                  <div></div>
            </Header>
      )
}

export default Navbar
