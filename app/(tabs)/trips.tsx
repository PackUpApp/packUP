import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useApi } from "@/hooks/useApi";
import { formatRelativeTime } from "@/utils/time";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";

export default function TabTwoScreen() {
  const api = useApi();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: trips,
    error,
  } = useQuery({
    queryKey: ["trips"],
    async queryFn() {
      return await api.trips.list();
    },
  });

  console.log(trips);

  function onTripClick(uuid: string) {
    router.push({
      pathname: "./trip",
      params: {
        uuid,
        showSuggestions: "false",
      },
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient
      .invalidateQueries({
        queryKey: ["trips"],
      })
      .then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <Box>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Center>
            <Text className="text-7xl mt-5">Your Trips</Text>
            <Box>
              <VStack>
                {isLoading ? (
                  <Text>Loading…</Text>
                ) : (
                  trips?.map(trip => (
                    <Card
                      className="outline bg-slate-200 mb-8"
                      onTouchStart={() => onTripClick(trip.trip_id)}
                      key={trip.trip_id}
                    >
                      <Heading>{trip.name}</Heading>
                      <Text>{trip.purpose}</Text>
                      <Text>{formatRelativeTime(trip.start_date)}</Text>
                    </Card>
                  ))
                )}
              </VStack>
            </Box>
          </Center>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
