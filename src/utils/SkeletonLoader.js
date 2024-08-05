// SkeletonLoader.js
import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SkeletonLoader = (props) => (
  <ContentLoader
    speed={2}
    width={wp('100%')}
    height={hp('100%')}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Profile Header */}
    <Circle cx={wp('10%')} cy={hp('5%')} r={wp('5%')} />
    <Rect x={wp('20%')} y={hp('3%')} rx="5" ry="5" width={wp('30%')} height={hp('4%')} />
    <Rect x={wp('85%')} y={hp('3%')} rx="5" ry="5" width={wp('7%')} height={hp('4%')} />

    {/* Search Bar */}
    <Rect x={wp('5%')} y={hp('12%')} rx="5" ry="5" width={wp('80%')} height={hp('6%')} />
    <Rect x={wp('88%')} y={hp('12%')} rx="5" ry="5" width={wp('7%')} height={hp('6%')} />

    {/* Request Visit Section */}
    <Rect x={wp('5%')} y={hp('20%')} rx="5" ry="5" width={wp('42%')} height={hp('14%')} />
    <Rect x={wp('53%')} y={hp('20%')} rx="5" ry="5" width={wp('42%')} height={hp('14%')} />

    {/* Casa Real Models Title */}
    <Rect x={wp('5%')} y={hp('37%')} rx="5" ry="5" width={wp('90%')} height={hp('4%')} />

    {/* Casa Real Models Cards */}
    <Rect x={wp('5%')} y={hp('44%')} rx="5" ry="5" width={wp('70%')} height={hp('40%')} />
    <Rect x={wp('77%')} y={hp('44%')} rx="5" ry="5" width={wp('70%')} height={hp('40%')} />
  </ContentLoader>
);

export default SkeletonLoader;
