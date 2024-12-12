import { useApi } from "@/hooks/useApi";
import { Item, Trip } from "@/utils/model";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Button,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PackingListScreen = () => {
  const api = useApi();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const params = useLocalSearchParams();
  const { uuid, showSuggestions: doSuggest } = params as { uuid: string; showSuggestions: string };
  const showSuggestions = doSuggest === "true";

  const {
    isLoading,
    data: { trip, items } = {},
    error,
  } = useQuery({
    queryKey: [`trip-${uuid}`],
    async queryFn() {
      const [trip, items] = await Promise.all([
        api.trips.get(uuid),
        api.trips.items.getAll(uuid).then(item => item.sort((a, b) => a.item_name.localeCompare(b.item_name))),
      ]);
      return { trip, items };
    },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient
      .invalidateQueries({
        queryKey: [`trip-${uuid}`],
      })
      .then(() => setRefreshing(false));
  }, [trip, items, uuid]);

  const check = useMutation({
    async mutationFn({ item_id, checked }: { item_id: string; checked: boolean }) {
      console.log("doing the thing");

      console.log("did the thing");
      return { item_id, checked };
    },
    async onMutate({ item_id, checked }) {
      console.log("mutated");
      await queryClient.cancelQueries({
        queryKey: [`trip-${uuid}`],
      });

      console.log("queries cancelled");

      const previousData = queryClient.getQueryData([`trip-${uuid}`]);

      console.log("previousData", previousData);

      queryClient.setQueryData([`trip-${uuid}`], (oldData: { trip: Trip; items: Item[] }) => {
        console.log("old data", oldData);
        if (!oldData || !oldData.items) return oldData;

        console.log(oldData);

        const newItem = oldData.items.find(item => item.item_id === item_id);
        if (newItem) newItem.checked = checked;

        const update = [...oldData.items.filter(item => item.item_id !== item_id), ...(newItem ? [newItem] : [])];

        console.log("update", update);

        return { trip: oldData.trip, items: update } as { trip: Trip; items: Item[] };
      });

      console.log("stuff set");

      return { previousData };
    },
    onError(error, variables, context) {
      // Rollback to the previous state
      console.log("failed to mutate", error, variables, context);
      if (context?.previousData) {
        queryClient.setQueryData([`trip-${uuid}`], context.previousData);
      }
    },
  });

  const [newItem, setNewItem] = useState(""); // State for new item input

  const handleCheckboxChange = useCallback(
    (item: string) => {
      console.log("IS ANYTHING HAPPENING");

      const changedItem = items?.find(_item => _item.item_id === item);
      console.log({ changedItem });
      if (!changedItem) return;

      check.mutate({ item_id: item, checked: !changedItem.checked });
    },
    [items, uuid],
  );

  const handleAddItem = () => {
    // todo
    if (newItem.trim() && !items?.some(item => item.item_name === newItem.trim().toLowerCase())) {
      const existingItem = items?.find(item => item.item_name === newItem.trim().toLowerCase());
      setNewItem(""); // Clear the input field
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    Alert.alert("Are you sure?", `Do you really want to remove "${itemToRemove}" from the list?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          // check.mutate({ item_id: itemToRemove, checked: false });
        },
      },
    ]);
  };

  const Checkbox = ({ label, item }: { label: string; item: Item }) => (
    <View className="flex-row items-center mb-8 justify-between">
      <TouchableOpacity
        onPress={() => handleCheckboxChange(item.item_id)}
        className="w-[24px] h-[24px] border border-gray rounded mr-[8px] justify-center align-text-top"
      >
        {item.checked && <Ionicons name="checkmark-sharp" size={20} color="blue" />}
      </TouchableOpacity>
      <Text className="text-xl flex-1">{label}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item.item_id)}>
        <Feather name="trash" color="red" size={20} className="align-top" />
      </TouchableOpacity>
    </View>
  );

  function handleGoingBackToTrips() {
    router.navigate("./trips");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="flex-row mt-2 mb-1">
          <Ionicons name="arrow-back-sharp" size={25} onPress={handleGoingBackToTrips} className="mr-2" />
          <Text className="text-2xl font-bold mb-4">Packing List {trip ? `for ${trip.name}` : ""}</Text>
        </View>

        {/* Input for adding new item */}
        <View className="flex flex-row items-center mb-4">
          <TextInput
            className="border border-gray-500 p-2 flex-1 mr-2"
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Add new item"
          />
          <Button title="Add" onPress={handleAddItem} />
        </View>

        {/* Dynamically render checkboxes */}
        <View>
          {items?.map(item => (
            <Checkbox key={item.item_id} label={`${item.item_name} ${item.quantity}x`} item={item} />
          ))}
        </View>

        {/* Show suggestions */}
        {/* {getSuggestedItems(trip?.region)} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackingListScreen;
