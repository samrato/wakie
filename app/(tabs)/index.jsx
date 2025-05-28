import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import styles from "../../assets/styles/ home.styles";
import Loader from "../../components/Loader";
import { API_URL } from "../../constants/api";
import COLORS from "../../constants/colors";
import { formatPublishDate } from "../../lib/util";
import { useAuthStore } from "../../store/authStore";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const { token } = useAuthStore();
  const [books, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // the fetching books
  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNum == 1) {
        setLoading(true);
      }
      // the fechin srory from dp
      const response = await fetch(
        `${API_URL}/api/story?pages=${pageNum}&limit=5`,
        {
          headers: { Authorization: `Bearer$(token)` },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fech vacatios ");

      // setBook((prevBooks) => [...prevBooks, ...data.books]);

      const uniqueBooks =
        refresh || pageNum == 1
          ? data.books
          : Array.from(
              new set([...books, ...data.books].map((book) => book._id))
            ).map((id) => [...books, data.book].find((book) => book._id == id));
      setBook(uniqueBooks);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Erroe feching place", error);
    } finally {
      if (refresh) {
        await sleep(800);
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      //await sleep(1000);
      await fetchBooks(page + 1);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.name}</Text>
        </View>
      </View>

      <View style={styles.bookImage}>
        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStar(item.rating)}
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>
          Shared on{formatPublishDate(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  const renderRatingStar = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b480" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
  };
  if (loading) return <Loader size="large" />;
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>StarLab</Text>
            <Text style={styles.headerSubtitle}>
              Discover great Vacations place
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="small"
              color={COLORS.primary}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={60}
              color={COLORS.textSecondary}
            />

            <Text style={styles.emptyText}>No recommendation yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share Vacation place!
            </Text>
          </View>
        }
      />
    </View>
  );
}
