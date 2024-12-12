import { climates } from "@/utils/climates";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Item } from "./model";

const Checkbox = React.memo(({ label, item }: { label: string; item?: Item }) => (
  <View className="flex-row items-center mb-8 justify-between">
    <Text className="text-xl flex-1 italic">{label}</Text>
    <TouchableOpacity>
      <Feather name="trash" color="red" size={20} className="align-top" />
    </TouchableOpacity>
  </View>
));

const suggestionsForAllTrips = [
  { name: "Phone charger", quantity: 1 },
  { name: "Phone", quantity: 1 },
  { name: "Travel documents", quantity: 1 },
  { name: "Toiletries kit", quantity: 1 },
  { name: "Walking shoes", quantity: 1 },
  { name: "Wallet", quantity: 1 },
];

const something: Record<keyof typeof climates, [{ name: string; quantity: number; }]>
  {
  
}; export default function getSuggestedItems(climate: string) {
  
  (climate === climates.st) {
    // sunny and tropical
    const suggestions = [
      { name: "Swimsuit", quantity: 1 },
      { name: "Sunscreen", quantity: 1 },
      { name: "Sunglasses", quantity: 1 },
      { name: "Flip-flops", quantity: 1 },
      { name: "Hat", quantity: 1 },
      { name: "Beach bag", quantity: 1 },
      { name: "Lightweight clothing", quantity: 5 },
      { name: "Sandals", quantity: 1 },
      { name: "Refillable water bottle", quantity: 1 },
      { name: "Snorkel gear", quantity: 1 },
      ...suggestionsForAllTrips,
    ];
    return suggestions?.map(item => <Checkbox key={item.name} label={`${item.name} ${item.quantity}x`} />);
  }
  if (climate === climates.sd) {
    // sunny and dry
    const suggestions = [
      { name: "Wide-brimmed hat", quantity: 1 },
      { name: "Sunscreen", quantity: 1 },
      { name: "Sunglasses", quantity: 1 },
      { name: "Lightweight clothing", quantity: 5 },
      { name: "Long-sleeve shirt", quantity: 2 },
      { name: "Sturdy walking shoes", quantity: 1 },
      { name: "Sandals", quantity: 1 },
      { name: "Refillable water bottle", quantity: 1 },
      { name: "Lip balm with SPF", quantity: 1 },
      { name: "Backpack", quantity: 1 },
      { name: "Bug spray", quantity: 1 },
      { name: "Camera", quantity: 1 },
      { name: "Bandana or scarf", quantity: 1 },
      { name: "Guidebook or map", quantity: 1 },
      ...suggestionsForAllTrips,
    ];
    return suggestions?.map(item => <Checkbox key={item.name} label={`${item.name} ${item.quantity}x`} />);
  }
  if (climate === climates.ow) {
    // outdoors and wild
    const suggestions = [
      { name: "Hiking boots", quantity: 1 },
      { name: "Moisture-wicking socks", quantity: 3 },
      { name: "Long-sleeve shirt", quantity: 2 },
      { name: "Lightweight jacket", quantity: 1 },
      { name: "Rain jacket or poncho", quantity: 1 },
      { name: "Backpack", quantity: 1 },
      { name: "Refillable water bottle", quantity: 1 },
      { name: "Map and compass or GPS device", quantity: 1 },
      { name: "Bug spray", quantity: 1 },
      { name: "Sunscreen", quantity: 1 },
      { name: "Sunglasses", quantity: 1 },
      { name: "Hat", quantity: 1 },
      { name: "Snacks or energy bars", quantity: 5 },
      { name: "Multi-tool or knife", quantity: 1 },
      { name: "Fire starter (matches, lighter, or flint)", quantity: 1 },
      { name: "First aid kit", quantity: 1 },
      { name: "Sleeping bag or blanket", quantity: 1 },
      { name: "Tent or shelter", quantity: 1 },
      { name: "Flashlight or headlamp", quantity: 1 },
      { name: "Extra batteries", quantity: 1 },
      { name: "Trash bags", quantity: 2 },
      { name: "Clothing layers (base, mid, outer)", quantity: 3 },
      ...suggestionsForAllTrips,
    ];
    return suggestions?.map(item => <Checkbox key={item.name} label={`${item.name} ${item.quantity}x`} />);
  }
  if (climate === climates.ou) {
    // outdoors and urban
    const suggestions = [
      { name: "Comfortable walking shoes", quantity: 1 },
      { name: "Casual clothing", quantity: 5 },
      { name: "Light jacket or sweater", quantity: 1 },
      { name: "Backpack or crossbody bag", quantity: 1 },
      { name: "Travel guidebook or map", quantity: 1 },
      { name: "Phone charger and power bank", quantity: 1 },
      { name: "Reusable water bottle", quantity: 1 },
      { name: "Sunglasses", quantity: 1 },
      { name: "Hat", quantity: 1 },
      { name: "Sunscreen", quantity: 1 },
      { name: "Notebook or travel journal", quantity: 1 },
      { name: "Evening wear or dressy outfit", quantity: 1 },
      { name: "Lightweight umbrella", quantity: 1 },
      { name: "Snacks or gum", quantity: 5 },
      { name: "Public transportation pass", quantity: 1 },
      { name: "Reusable shopping bag", quantity: 1 },
      { name: "Hand sanitizer", quantity: 1 },
      { name: "Toiletries kit", quantity: 1 },
      { name: "Earbuds or headphones", quantity: 1 },
      { name: "Books or e-reader", quantity: 1 },
      { name: "Notebook and pen", quantity: 1 },
      ...suggestionsForAllTrips,
    ];
    return suggestions?.map(item => <Checkbox key={item.name} label={`${item.name} ${item.quantity}x`} />);
  }
  if (climate === climates.cd) {
    // cold
    const suggestions = [
      { name: "Insulated jacket", quantity: 1 },
      { name: "Thermal base layers", quantity: 2 },
      { name: "Fleece or wool sweater", quantity: 2 },
      { name: "Waterproof outer shell", quantity: 1 },
      { name: "Warm hat", quantity: 1 },
      { name: "Gloves or mittens", quantity: 1 },
      { name: "Scarf or neck gaiter", quantity: 1 },
      { name: "Insulated waterproof boots", quantity: 1 },
      { name: "Moisture-wicking socks", quantity: 3 },
      { name: "Thick wool socks", quantity: 2 },
      { name: "Snow pants or waterproof trousers", quantity: 1 },
      { name: "Backpack", quantity: 1 },
      { name: "Reusable water bottle", quantity: 1 },
      { name: "Sunscreen (for snow glare)", quantity: 1 },
      { name: "Sunglasses or snow goggles", quantity: 1 },
      { name: "Lip balm with SPF", quantity: 1 },
      { name: "Hand warmers", quantity: 5 },
      { name: "Fire starter (matches, lighter, or flint)", quantity: 1 },
      { name: "Snacks or energy bars", quantity: 5 },
      { name: "First aid kit", quantity: 1 },
      { name: "Power bank", quantity: 1 },
      { name: "Headlamp or flashlight", quantity: 1 },
      { name: "Extra batteries", quantity: 1 },
      { name: "Multi-tool or knife", quantity: 1 },
      ...suggestionsForAllTrips,
    ];
    return suggestions?.map(item => <Checkbox key={item.name} label={`${item.name} ${item.quantity}x`} />);
  }
  if (climate === climates.rn) {
    // rainy
    const suggestions = [
      { name: "Rain jacket", quantity: 1 },
      { name: "Waterproof shoes", quantity: 1 },
      { name: "Umbrella", quantity: 1 },
      { name: "Quick-dry clothes", quantity: 3 },
      { name: "Waterproof backpack", quantity: 1 },
      { name: "Hat with a brim", quantity: 1 },
      { name: "Mosquito repellent", quantity: 1 },
      { name: "Waterproof phone case", quantity: 1 },
      { name: "Portable charger", quantity: 1 },
      { name: "High SPF sunscreen", quantity: 1 },
      { name: "Waterproof pants", quantity: 1 },
      { name: "Sturdy hiking boots", quantity: 1 },
      { name: "Insect bite cream", quantity: 1 },
      { name: "Towel (quick-dry)", quantity: 1 },
      { name: "Lightweight sweater", quantity: 2 },
      { name: "Gaiters (for mud protection)", quantity: 1 },
      { name: "Water-resistant socks", quantity: 3 },
      { name: "Flashlight or headlamp", quantity: 1 },
      { name: "Binoculars", quantity: 1 },
      ...suggestionsForAllTrips,
    ];
    return suggestions?.map(item => <Checkbox key={item.name} label={`${item.name} ${item.quantity}x`} />);
  }
}
