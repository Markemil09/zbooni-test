import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#60F79D', 
        tabBarStyle: {
            backgroundColor: '#121212',
            borderTopColor: '#121212',
        }, 
        headerShown: false
        }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'CREATE',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-box-multiple-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'NOTIFICATIONS',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'ORDERS',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="file-document-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stores"
        options={{
          title: 'STORE',
          tabBarIcon: ({ color }) => <FontAwesome5 size={24} name="store" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'MORE',
          tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="ellipsis-h" color={color} />,
        }}
      />
    </Tabs>
  );
}
