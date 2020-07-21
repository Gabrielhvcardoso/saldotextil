import React from 'react';
import { Animated, FlatList, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import Product from '../../components/Product';
import Filters from '../../components/Filters';
import FiltersModal from '../../components/Modal';

import GeneralContext from '../../context';
import { Container, Footer, Search, Bar, FlatListHeader } from './styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Feed({ navigation }) {
  const { tools, setTools } = React.useContext(GeneralContext);
  React.useEffect(() => setTools({ ...tools, navigation }), []);

  // Função que carrega os primeiros anúncios
  const [results, setResults] = React.useState({
    announcements: [],
    quantity: 0,
    type: 'confeccao',
    adstype: 'selling',
    localization: ''
  });
  React.useEffect(() => {
    const getFromApi = () => {
      // Falso assíncrono temporário
      setTimeout(() => {
        const response = [
          { uid: Math.random() },
          { uid: Math.random() },
          { uid: Math.random() },
          { uid: Math.random() },
          { uid: Math.random() },
        ];

        setResults({
          ...results,
          announcements: response,
          quantity: results.quantity + response.length,
        });
      }, 2000);
    }
    getFromApi();
  }, [])

  // Animação da imagem de topo
  const headerMaxHeight = 200;
  const headerMinHeight = 50;
  const scrollYAnimatedValue = new Animated.Value(0);
  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, (headerMaxHeight, headerMinHeight)],
    outputRange: [headerMaxHeight, headerMinHeight],
    extrapolate: 'clamp'
  });

  // Função scroll infinito
  const handleEndOfScroll = () => {
    setTimeout(() => {
      const response = [
        { uid: Math.random() },
        { uid: Math.random() },
        { uid: Math.random() },
        { uid: Math.random() },
        { uid: Math.random() },
      ];
      
      setResults({
        ...results,
        announcements: [ ...results.announcements, ...response ],
        quantity: results.quantity + response.length,
      });
    }, 1000);
    
  }

  const [modal, setModal] = React.useState({
    product: false,
    localization: false,
  });

  return (
    <Container>
      <FiltersModal
        status={{
          value: modal.product,
          set: (n) => setModal({ ...modal, product: n }),
        }}
        options={[
          {
            title: 'Tipo de anúncio',
            options: [
              { name: 'Venda', action: () => setResults({ ...results, adstype: 'selling'}), active: results.adstype === 'selling' },
              { name: 'Compra', action: () => setResults({ ...results, adstype: 'buying'}), active: results.adstype === 'buying' }
            ]
          },
          {
            title: 'Tipo de produto',
            options: [
              { name: 'Confeçções', action: () => setResults({ ...results, type: 'confeccao'}), active: results.type === 'confeccao' },
              { name: 'Malhas', action: () => setResults({ ...results, type: 'malha'}), active: results.type === 'malha' },
              { name: 'Outros', action: () => setResults({ ...results, type: 'outros'}), active: results.type === 'outros' }

            ]
          }
        ]}
      />

      <FiltersModal
        status={{
          value: modal.localization,
          set: (n) => setModal({ ...modal, localization: n }),
        }}
        options={[
          {
            title: 'Estado',
            options: [
              { name: 'Nenhum', action: () =>setResults({ ...results, localization: '' }), active: results.localization === '' },
              { name: 'AC', action: () => setResults({ ...results, localization: 'AC' }), active: results.localization === 'AC' },
              { name: 'AL', action: () => setResults({ ...results, localization: 'AL' }), active: results.localization === 'AL' },
              { name: 'AP', action: () => setResults({ ...results, localization: 'AP' }), active: results.localization === 'AP' },
              { name: 'AM', action: () => setResults({ ...results, localization: 'AM' }), active: results.localization === 'AM' },
              { name: 'BA', action: () => setResults({ ...results, localization: 'BA' }), active: results.localization === 'BA' },
              { name: 'CE', action: () => setResults({ ...results, localization: 'CE' }), active: results.localization === 'CE' },
              { name: 'DF', action: () => setResults({ ...results, localization: 'DF' }), active: results.localization === 'DF' },
              { name: 'ES', action: () => setResults({ ...results, localization: 'ES' }), active: results.localization === 'ES' },
              { name: 'GO', action: () => setResults({ ...results, localization: 'GO' }), active: results.localization === 'GO' },
              { name: 'MA', action: () => setResults({ ...results, localization: 'MA' }), active: results.localization === 'MA' },
              { name: 'MT', action: () => setResults({ ...results, localization: 'MT' }), active: results.localization === 'MT' },
              { name: 'MS', action: () => setResults({ ...results, localization: 'MS' }), active: results.localization === 'MS' },
              { name: 'MG', action: () => setResults({ ...results, localization: 'MG' }), active: results.localization === 'MG' },
              { name: 'PA', action: () => setResults({ ...results, localization: 'PA' }), active: results.localization === 'PA' },
              { name: 'PB', action: () => setResults({ ...results, localization: 'PB' }), active: results.localization === 'PB' },
              { name: 'PR', action: () => setResults({ ...results, localization: 'PR' }), active: results.localization === 'PR' },
              { name: 'PE', action: () => setResults({ ...results, localization: 'PE' }), active: results.localization === 'PE' },
              { name: 'PI', action: () => setResults({ ...results, localization: 'PI' }), active: results.localization === 'PI' },
              { name: 'RJ', action: () => setResults({ ...results, localization: 'RJ' }), active: results.localization === 'RJ' },
              { name: 'RN', action: () => setResults({ ...results, localization: 'RN' }), active: results.localization === 'RN' },
              { name: 'RS', action: () => setResults({ ...results, localization: 'RS' }), active: results.localization === 'RS' },
              { name: 'RO', action: () => setResults({ ...results, localization: 'RO' }), active: results.localization === 'RO' },
              { name: 'RR', action: () => setResults({ ...results, localization: 'RR' }), active: results.localization === 'RR' },
              { name: 'SC', action: () => setResults({ ...results, localization: 'SC' }), active: results.localization === 'SC' },
              { name: 'SP', action: () => setResults({ ...results, localization: 'SP' }), active: results.localization === 'SP' },
              { name: 'SE', action: () => setResults({ ...results, localization: 'SE' }), active: results.localization === 'SE' },
              { name: 'TO', action: () => setResults({ ...results, localization: 'TO' }), active: results.localization === 'TO' },
            ],
          },
        ]}
      />

      <SafeAreaView>
        
        <AnimatedFlatList
          data={results.announcements}
          keyExtractor={item => item.uid}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            () => (
              <FlatListHeader>
                <Bar>
                  <Search placeholder="Pesquise algo" />
                </Bar>
                <Filters
                  data={[
                    {
                      title: 'Tipo de produto',
                      action: () => setModal({ ...modal, product: true })
                    },
                    {
                      title: 'Localização',
                      action: () => setModal({ ...modal, localization: true })
                    }
                  ]}
                />
              </FlatListHeader>
            )
          }
          renderItem={() => <Product />}
          ListFooterComponent={() => <Footer />}
          contentContainerStyle={{ paddingTop: headerMaxHeight-50 }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } }}], { useNativeDriver: false }
          )}

          onEndReached={() => handleEndOfScroll()}
          onEndReachedThreshold={0}
        />
        <Animated.View style={[ styles.animatedHeaderContainer, { height: headerHeight }]}>
            <Animated.Image source={require('../../../assets/images/logo.png')} style={styles.image} />
        </Animated.View>
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  animatedHeaderContainer: {
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#fff',
    top: (Platform.OS === 'ios') ? 20 : 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  image: {
    resizeMode: 'contain',
    width: '80%',
    height: '100%',
  }
})
