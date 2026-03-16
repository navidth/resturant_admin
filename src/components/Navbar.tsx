'use client'
import { Button, Menu, MenuProps, theme } from 'antd'
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
      console.log(menuItems)

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
            token: { colorBgContainer, borderRadiusLG, colorBgLayout, colorBorder,colorInfoBorderHover },
      } = theme.useToken();
      return (
            <Header style={{ display: "flex", justifyContent: "space-between", gap: 16, width: "100%" }}>
                  <div className='text-white'>LOGO</div>
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
                              <Button key={item.id} variant='outlined' className={`bg-inherit! hover:border-cyan-500! hover:text-cyan-500!  `} style={{color:colorBorder, borderColor:colorBorder }}  size="large">
                                    {item.label}
                              </Button>
                        ))}
                  </div>
                  <div></div>
            </Header>
      )
}

export default Navbar
