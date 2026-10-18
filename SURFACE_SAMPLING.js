// Display interpolation only. The climate planes, source mask and scores are unchanged.
// sx/sy are source-grid coordinates with integer positions at cell centers.
function sampleOliveSurface(scores,width,height,sx,sy){
 const cx=Math.floor(sx+.5),cy=Math.floor(sy+.5);
 if(cx<0||cy<0||cx>=width||cy>=height||scores[cy*width+cx]===255)return NaN;
 sx=Math.max(0,Math.min(width-1,sx));sy=Math.max(0,Math.min(height-1,sy));
 const x0=Math.floor(sx),y0=Math.floor(sy),x1=Math.min(width-1,x0+1),y1=Math.min(height-1,y0+1),tx=sx-x0,ty=sy-y0;
 const a=scores[y0*width+x0],b=scores[y0*width+x1],c=scores[y1*width+x0],d=scores[y1*width+x1];
 const wa=a===255?0:(1-tx)*(1-ty),wb=b===255?0:tx*(1-ty),wc=c===255?0:(1-tx)*ty,wd=d===255?0:tx*ty;
 const support=wa+wb+wc+wd;
 return support>0?(a*wa+b*wb+c*wc+d*wd)/support:NaN;
}
