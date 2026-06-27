import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';

const NavigationMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="bg-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Menu
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Content 
        className="min-w-[220px] bg-white rounded-md shadow-lg border border-gray-200 p-1"
        sideOffset={5}
      >
        <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
          Home
        </DropdownMenu.Item>
        <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
          About
        </DropdownMenu.Item>
        <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
          Contact
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
        <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
          Settings
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavigationMenu;